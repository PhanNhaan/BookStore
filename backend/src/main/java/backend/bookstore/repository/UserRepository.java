package backend.bookstore.repository;

import backend.bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserName(String userName);
    Optional<User> findByUserName(String userName);
    boolean existsByUserEmail(String email);
    boolean existsByUserPhone(String phone);
//    Optional<User> findById(Long id);
}
