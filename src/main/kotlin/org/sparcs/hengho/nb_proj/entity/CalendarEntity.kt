package org.sparcs.hengho.nb_proj.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "calendar")
class CalendarEntity(
    @Id
    @Column(name = "id")
    var id: Long? = null,

    @Column(name = "date_id")
    var dateId: Long? = null,

    @Column(name = "sum")
    var sum: Long? = null
)