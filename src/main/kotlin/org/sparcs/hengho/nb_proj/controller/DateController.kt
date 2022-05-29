package org.sparcs.hengho.nb_proj.controller

import org.sparcs.hengho.nb_proj.entity.DateEntity
import org.sparcs.hengho.nb_proj.repository.DateCustomRepository
import org.sparcs.hengho.nb_proj.repository.DateRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/dates")
class DateController(
    val dateRepository: DateRepository,
    val dateCustomRepository: DateCustomRepository
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

    @GetMapping("/month/{dateId}")
    fun getMonthlyDateByDateId(@PathVariable dateId: Long): Long {
        val dates = dateCustomRepository.findMonthlyByDateId(dateId)

        var sum = 0L
        dates.map { if(it.num != null) {
            if(it.state == true) sum += it.num!!
            else sum -= it.num!!
        } }
        return sum
    }

    @PostMapping("")
    fun createCalendar(@RequestBody dateEntity: DateEntity): ResponseEntity<DateEntity> {
        val date = dateRepository.save(
            DateEntity(
                dateEntity.id,
                dateEntity.dateId,
                dateEntity.state,
                dateEntity.num,
                dateEntity.title
            )
        )
        return ResponseEntity.ok(date)
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