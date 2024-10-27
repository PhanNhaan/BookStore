package backend.bookstore.mapper;

import backend.bookstore.dto.request.CategoryCreationRequest;
import backend.bookstore.dto.response.CategoryResponse;
import backend.bookstore.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest request);
    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryResponse request);
}
