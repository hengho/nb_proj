package org.sparcs.hengho.nb_proj.repository

import com.querydsl.jpa.impl.JPAQueryFactory
import org.sparcs.hengho.nb_proj.entity.DateEntity
import org.sparcs.hengho.nb_proj.entity.QDateEntity
import org.sparcs.hengho.nb_proj.entity.QUserEntity
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport
import org.springframework.stereotype.Repository
import javax.annotation.Resource

@Repository
class DateCustomRepository(
    @Resource(name = "jpaQueryFactory")
    val query: JPAQueryFactory
) : QuerydslRepositorySupport(DateEntity::class.java) {

    private final val user = QUserEntity.userEntity
    private final val date = QDateEntity.dateEntity

    fun findMonthlyByDateId(value: Long): List<DateEntity> {
        return query.selectFrom(date)
            .where(date.dateId.between(value, value + 99))
            .fetch()
    }
}