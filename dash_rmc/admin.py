from django.contrib import admin

# Register your models here.
from .models import (medicineType,
medicineItems,medicineCategory,Category,
medicineStorage
)



class medicineItemsAdmin(admin.ModelAdmin):
    list_display= ('medicine_type_id','medicine_details','created_at','update_at')
class medicineTypeAdmin(admin.ModelAdmin):
    list_display= ('medicine_type_name','created_at','update_at')
class medicineCategoryAdmin(admin.ModelAdmin):
    list_display= ('category_type_id','created_at','update_at')
class CategoryAdmin(admin.ModelAdmin):
    list_display= ('category_name','created_at','update_at')
class medicineStorageAdmin(admin.ModelAdmin):
    list_display= ('medicine_item_id','quantity','created_at','update_at')


admin.site.register(medicineType, medicineTypeAdmin)

admin.site.register(medicineItems, medicineItemsAdmin)

admin.site.register(medicineCategory, medicineCategoryAdmin)

admin.site.register(Category, CategoryAdmin)

admin.site.register(medicineStorage, medicineStorageAdmin)


