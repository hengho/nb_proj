package org.sparcs.hengho.nb_proj.controller

import org.sparcs.hengho.nb_proj.entity.DateEntity
import org.sparcs.hengho.nb_proj.repository.DateRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

//@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/calendars")
class DateController(
    val dateRepository: DateRepository
) {
    @GetMapping("")
    fun getDate(): ResponseEntity<List<DateEntity>> {
        val res = dateRepository.findAll()

        return ResponseEntity.ok(res)
    }

    @GetMapping("/{dateId}")
    fun getDateByDateId(@PathVariable dateId: Long): ResponseEntity<List<DateEntity>> {
        val dates = dateRepository.findByDateId(dateId)
        return ResponseEntity.ok(dates)
    }

    @PostMapping("")
    fun createCalendar(@RequestBody dateEntity: DateEntity): ResponseEntity<DateEntity> {
        val res = dateRepository.save(dateEntity)

        return ResponseEntity.ok(res)
    }

    @PutMapping("/{id}")
    fun updateCalendar(
        @PathVariable id: Long,
        @RequestBody dateEntity: DateEntity
    ): ResponseEntity<DateEntity> {
        return try {
            val date = dateRepository.findById(id)

            var date1 = date.get()
            date1.id = dateEntity.id
            date1.dateId = dateEntity.dateId
            date1.num = dateEntity.num
            date1.state = dateEntity.state
            date1.title = dateEntity.title

            ResponseEntity.ok(dateRepository.save(date1))
        } catch (e: Exception) {
            ResponseEntity<DateEntity>(null, HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteCalendar(@PathVariable id: Long) {
        try {
            dateRepository.deleteById(id)
        } catch (e: Exception) {
            println(e)
        }
    }

}