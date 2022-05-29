package org.sparcs.hengho.nb_proj.repository

import org.sparcs.hengho.nb_proj.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<UserEntity, Long> {
    fun findByUserId(userId: String): List<UserEntity>
}