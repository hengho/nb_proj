package org.sparcs.hengho.nb_proj.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "date")
class DateEntity (
    @Id
    @Column(name = "id")
    var id: Long? = null,

    @Column(name = "date_id")
    var dateId: Long? = null,

    @Column(name = "state")
    var state: Boolean? = null,

    @Column(name = "num")
    var num: Long? = null,

    @Column(name = "title")
    var title: String? = null
)