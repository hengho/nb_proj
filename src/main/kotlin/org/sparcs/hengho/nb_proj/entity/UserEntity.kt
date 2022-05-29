package org.sparcs.hengho.nb_proj.entity

import javax.persistence.*

@Entity
@Table(name = "user")
class UserEntity (
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "user_id")
    var userId: String? = null,

    @Column(name = "user_password")
    var userPassword: String? = null,
)