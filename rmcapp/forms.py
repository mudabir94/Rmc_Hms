from django.forms import ModelForm
from django import forms
from rmcapp.models import Employee
from rmcapp.models import User as WebUser 
from .models import Photo,presUploadedFiles

# class EmployeeForm(ModelForm):
#     class Meta:
#         model=Employee
#         # fields=['__all__']


class WebUserCreationForm(forms.ModelForm):
    class Meta:
        model = WebUser
        fields = ('username', 'role')

    def save(self, commit=True, pwd= None):
        user = super(WebUserCreationForm, self).save(commit=False)
        # Save the provided password in hashed format
        if pwd:
            default_password = pwd
            user.set_password(default_password)
        if commit:
            user.save()
        return user



class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ('file', "title")
        # fields='__all__'
class PresUploadedFilesForm(forms.ModelForm):
    class Meta:
        model = presUploadedFiles
        fields=("file",)