package org.sparcs.hengho.nb_proj.repository

import org.sparcs.hengho.nb_proj.entity.DateEntity
import org.springframework.data.jpa.repository.JpaRepository

interface DateRepository: JpaRepository<DateEntity, Long> {
    fun findByDateId(dateId: Long): List<DateEntity>
}