from pydantic import BaseModel

class UserCreate(BaseModel):   #Request Schema register
    username:str
    password:str
    email:str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):  #Response Schema login
    id:int
    username:str
    email:str

    
    class Config:
        from_attributes = True
  

  