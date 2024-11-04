package backend.bookstore.services;

import backend.bookstore.dto.request.CategoryCreationRequest;
import backend.bookstore.dto.response.CategoryResponse;
import backend.bookstore.exception.AppException;
import backend.bookstore.exception.ErrorCode;
import backend.bookstore.mapper.CategoryMapper;
import backend.bookstore.model.Category;
import backend.bookstore.repository.CategoryRepository;
import backend.bookstore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    public CategoryResponse createCategory(CategoryCreationRequest request) {
        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new AppException(ErrorCode.CATEGORY_EXISTED);
        }
        Category category = categoryMapper.toCategory(request);

        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryResponse).toList();
    }

    public void deleteCategory(Long id) {
        if (categoryRepository.findById(id).isPresent()) {
            categoryRepository.deleteById(id);
        }
        else {
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }
    }

    public CategoryResponse updateCategory(CategoryResponse request) {
        var category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        categoryMapper.updateCategory(category, request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }



}
