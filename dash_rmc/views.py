from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class mainHome(TemplateView):
    template_path_name="dash_rmc/mainhomepage_template/index.html"
    def get(self,request):
        print("LOGG")
        return render(request,self.template_path_name)
    def post(self,request):
        pass
class dashBoardMain(TemplateView):

    def get(self,request):
        return render(request,self.template_path_name)

    def post(self,request):
        pass
def Test(request):
    template_path_name="dash_rmc/mainhomepage_template/pro_sidebar_template_with_bootstrap_4.html"

    return render(request,template_path_name)