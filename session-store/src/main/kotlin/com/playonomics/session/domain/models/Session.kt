package com.playonomics.session.domain.models

import com.fasterxml.jackson.annotation.JsonProperty

data class Session(val id: String,
                   val token: String?,
                   val firstName: String? = null,
                   val lastName: String? = null,
                   @JsonProperty("isActive") var isActive: Boolean? = true,
                   var email: String?,
                   var authorities: List<Authority>? = listOf(Authority.USER),
                   var userId :String?)