from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializer import *


# Create your views here.

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email',None)
        print(email, '+++++++++++++++')
        serializer = UserSerializer(data=request.data)
        if User.objects.filter(email=email).exists():
            return Response(data={'message':'Email Already Exists'},status=status.HTTP_400_BAD_REQUEST)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        user.is_active = True
        user.save()
        return Response(serializer.data)
    
class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.pop("email", None)
        password = request.data.pop("password", None)

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                user_data = {
                "email": user.email,
                "user_id": user.id,
                "profile": user.profile_img_url,
                "is_tutor": user.is_tutor,
                }
                
                return Response(
                    status=status.HTTP_202_ACCEPTED,
                    data={"message": "logged in", "user": user_data},
                )
            else:
                if User.objects.filter(email=email).exists():
                    return Response(
                        status=status.HTTP_401_UNAUTHORIZED,
                        data={"message": "Wrong Password !"},
                    )
                else:
                    return Response(
                        status=status.HTTP_400_BAD_REQUEST,
                        data={"message": "No Such User !"},
                    )
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "credentials not provided"},
            )
        
class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh-token"])
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "Token Not Provided"},
            )
