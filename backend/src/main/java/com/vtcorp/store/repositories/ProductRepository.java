package com.vtcorp.store.repositories;

import com.vtcorp.store.dtos.projections.ProductBuyerView;
import com.vtcorp.store.dtos.projections.ProductManagementView;
import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.active = ?1 WHERE p.productId = ?2")
    void setActivateProduct(boolean active, long id);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.categoryId IN ?1")
    List<Product> findAllByCategories(List<Long> categoryIds);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.categoryId IN ?1 and p.active = true")
    List<Product> findActiveByCategories(List<Long> categoryIds);

    Page<ProductManagementView> findByNameContainingIgnoreCase(String searchQuery, Pageable pageable);

    Page<ProductBuyerView> findByNameContainingIgnoreCaseAndActiveTrue(String searchQuery, Pageable pageable);

    List<Product> findByBrand(Brand brand);

    List<Product> findByBrandAndActive(Brand brand, boolean active);

    Page<ProductBuyerView> findByActiveTrue(Pageable pageable);

    Page<ProductManagementView> findAllBy(Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.productId = :id")
    Optional<Product> findByIdWithLock(@Param("id") Long id);
}