package com.playonomics.session.domain.models

import com.fasterxml.jackson.annotation.JsonProperty

enum class Authority {
    ADMIN, USER
}


data class SessionRequest(
    val id: String,
    val token: String? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    @JsonProperty("isActive") var isActive: Boolean? = true,
    var email : String?,
    var authorities: List<Authority>? = listOf(Authority.USER)
)