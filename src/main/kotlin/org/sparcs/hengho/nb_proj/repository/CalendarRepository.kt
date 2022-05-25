package org.sparcs.hengho.nb_proj.repository

import org.sparcs.hengho.nb_proj.entity.CalendarEntity
import org.springframework.data.jpa.repository.JpaRepository

interface CalendarRepository: JpaRepository<CalendarEntity, Long> {
    fun findByDateId(dateId: Long): List<CalendarEntity>
    fun deleteByDateId(dateId: Long)
}