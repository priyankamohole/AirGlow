from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from app.db.database import SessionLocal
from jose import JWTError, jwt
from fastapi.responses import RedirectResponse
import app.schemas.user as schema
import app.models.user as models
from app.core.security import hash_password, verify_password, create_access_token
from dotenv import load_dotenv
from app.core.security import oauth
import os
from fastapi.responses import RedirectResponse

router=APIRouter()
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schema.UserResponse)
async def register(user: schema.UserCreate, db=Depends(get_db)):

    existing_user = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_username = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

#authentication
@router.post("/login")
async def login(user: schema.UserLogin, db=Depends(get_db)):

    db_user = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    if db_user.hashed_password == "":
        raise HTTPException(
            status_code=400,
            detail="Please sign in using Google or GitHub."
        )

    if not verify_password(
        user.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    token = create_access_token(
        data={
            "sub": str(db_user.id)
        }
    )

    return {
        "access_token": token
    }
    
    
#authorization
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db=Depends(get_db)
):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        user = (
            db.query(models.User)
            .filter(models.User.id == int(user_id))
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


# @router.get("/auth/google")
# async def auth_google(request : Request):
#     token= await oauth.google.authorize_access_token(request)
#     user_info=token.get("userinfo")
#     jwt_token=create_access_token(data={"sub":user_info.get("email")})
#     return {
#         "provider":"Google",
#         "user":user_info,
#         "access_token":jwt_token
#     }

@router.get("/google/callback")
async def auth_google(
    request: Request,
    db=Depends(get_db)
):
    token = await oauth.google.authorize_access_token(request)

    user_info = token.get("userinfo")

    email = user_info["email"]

    username = email.split("@")[0]

    user = (
        db.query(models.User)
        .filter(models.User.email == email)
        .first()
    )

    if not user:

        user = models.User(
            username=username,
            email=email,
            hashed_password=""
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    jwt_token = create_access_token(
    data={
        "sub": str(user.id)
    }
)
    return RedirectResponse(
        f"http://localhost:5173/oauth-success?token={jwt_token}"
    )

@router.get("/login/google")
async def login_google(request: Request):
    redirect_uri = "http://localhost/auth/google/callback"
    print("Redirect URI:", redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

# @router.get("/auth/github")
# async def auth_github(request:Request):
#     token=await oauth.github.authorize_access_token(request)
#     resp = await oauth.github.get("user", token=token)
#     user_info = resp.json()
#     jwt_token=create_access_token(data={"sub":user_info.get("email") or user_info.get("login")})
#     return {
#         "provider":"Github",
#         "user":user_info,
#         "access_token":jwt_token
#     }

# @router.get("/github/callback")
# async def auth_github(request: Request):
#     token = await oauth.github.authorize_access_token(request)
#     resp = await oauth.github.get("user", token=token)
#     user_info = resp.json()

#     jwt_token = create_access_token(
#         data={"sub": user_info.get("email") or user_info.get("login")}
#     )

#     return RedirectResponse(
#         url=f"http://localhost:5173/oauth-success?token={jwt_token}"
#     )

# @router.get("/login/github")
# async def login_github(request:Request):
#     redirect_uri=request.url_for("auth_github")
#     return await oauth.github.authorize_redirect(request, redirect_uri)

@router.get("/login/github")
async def login_github(request: Request):
    redirect_uri = "http://localhost/auth/github/callback"
    return await oauth.github.authorize_redirect(request, redirect_uri)


@router.get("/github/callback")
async def auth_github(
    request: Request,
    db=Depends(get_db)
):
    token = await oauth.github.authorize_access_token(request)

    resp = await oauth.github.get(
        "user",
        token=token
    )

    user_info = resp.json()

    username = user_info["login"]

    email = user_info.get("email")

    if email is None:
        email = f"{username}@github.local"

    user = (
        db.query(models.User)
        .filter(models.User.email == email)
        .first()
    )

    if not user:

        user = models.User(
            username=username,
            email=email,
            hashed_password=""
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    jwt_token = create_access_token(
        {
            "sub": user.username
        }
    )

    return RedirectResponse(
        f"http://localhost:5173/oauth-success?token={jwt_token}"
    )

@router.get("/me")
async def get_me(
    current_user: models.User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }