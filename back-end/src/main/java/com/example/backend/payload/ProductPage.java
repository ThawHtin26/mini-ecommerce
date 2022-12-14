package com.example.backend.payload;

import com.example.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPage {
    int pageSize;
    long totalElements;
    int totalPages;
    int pageNo;
    List<Product> products;
}
