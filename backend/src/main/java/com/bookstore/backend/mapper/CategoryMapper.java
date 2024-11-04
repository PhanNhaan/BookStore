package com.bookstore.backend.mapper;

import com.bookstore.backend.dto.request.CategoryCreationRequest;
import com.bookstore.backend.dto.response.CategoryResponse;
import com.bookstore.backend.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest request);
    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryResponse request);
}
