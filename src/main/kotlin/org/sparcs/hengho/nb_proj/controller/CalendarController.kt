package org.sparcs.hengho.nb_proj.controller

import org.sparcs.hengho.nb_proj.entity.CalendarEntity
import org.sparcs.hengho.nb_proj.repository.CalendarRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://ssal.sparcs.org:33000"])
@RestController
@RequestMapping("/calendars")
class CalendarController(
    val calendarRepository: CalendarRepository
) {
    @GetMapping("")
    fun getCalendar(): ResponseEntity<List<CalendarEntity>> {
        val res = calendarRepository.findAll()

        return ResponseEntity.ok(res)
    }

    @GetMapping("/{dateId}")
    fun getCalendarByDateId(@PathVariable dateId: Long): ResponseEntity<CalendarEntity> {
        return try {
            val calendars = calendarRepository.findByDateId(dateId)
            val calendar = calendars[0]

            ResponseEntity.ok(calendar)
        } catch (e: Exception) {
            ResponseEntity<CalendarEntity>(null, HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("")
    fun createCalendar(@RequestBody calendarEntity: CalendarEntity): ResponseEntity<CalendarEntity> {
        val res = calendarRepository.save(calendarEntity)

        return ResponseEntity.ok(res)
    }

    @PutMapping("/{dateId}")
    fun updateCalendar(@PathVariable dateId: Long, @RequestBody calendarEntity: CalendarEntity): ResponseEntity<CalendarEntity> {
        return try {
            val calendars = calendarRepository.findByDateId(dateId)
            val calendar = calendars[0]

            var calendar1 = calendar
            calendar1.id = calendarEntity.id
            calendar1.dateId = calendarEntity.dateId
            calendar1.sum = calendarEntity.sum

            ResponseEntity.ok(calendarRepository.save(calendar1))
        } catch (e: Exception) {
            ResponseEntity<CalendarEntity>(null, HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("/{dateId}")
    fun deleteCalendar(@PathVariable dateId: Long) {
        try {
            calendarRepository.deleteById(dateId)
        } catch (e: Exception) {
            println(e)
        }
    }

}