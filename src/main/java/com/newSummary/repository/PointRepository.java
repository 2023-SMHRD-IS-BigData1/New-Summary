package com.newSummary.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newSummary.domain.entity.Point;
import com.newSummary.domain.entity.User;

public interface PointRepository extends JpaRepository<Point, Long>{

	Optional<Point> findByUser(User user);

}
