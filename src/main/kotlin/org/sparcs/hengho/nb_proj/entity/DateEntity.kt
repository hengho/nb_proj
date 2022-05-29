package org.sparcs.hengho.nb_proj.entity

import javax.persistence.*

@Entity
@Table(name = "date")
class DateEntity (
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "date_id")
    var dateId: Long? = null,

    @Column(name = "state") //true면 수입, false면 지출
    var state: Boolean? = null,

    @Column(name = "num")
    var num: Long? = null,

    @Column(name = "title")
    var title: String? = null
)