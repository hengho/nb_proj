package org.sparcs.hengho.nb_proj.controller

import org.sparcs.hengho.nb_proj.entity.UserEntity
import org.sparcs.hengho.nb_proj.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/users")
class UserController(
    val userRepository: UserRepository
) {
    @GetMapping("")
    fun getUsers(): ResponseEntity<List<UserEntity>> {
        val res = userRepository.findAll()

        return ResponseEntity.ok(res)
    }

    @GetMapping("/{userId}")
    fun getUser(@PathVariable userId: String): ResponseEntity<List<UserEntity>> {
        val user = userRepository.findByUserId(userId)
        return ResponseEntity.ok(user)
    }

    @PostMapping("")
    fun createUser(@RequestBody userEntity: UserEntity): ResponseEntity<UserEntity> {
        val user = userRepository.save(
            UserEntity(
                userEntity.id,
                userEntity.userId,
                userEntity.userPassword
            )
        )
        return ResponseEntity.ok(user)
    }
}