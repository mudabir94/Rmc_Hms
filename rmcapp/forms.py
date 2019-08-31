from django.forms import ModelForm
from django import forms
from rmcapp.models import Employee
class EmployeeForm(ModelForm):
    class Meta:
        model=Employee
        fields=['__all__']
