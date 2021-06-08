package com.playonomics.session.domain.models

import com.fasterxml.jackson.annotation.JsonProperty

data class Session(val id: String,
                   val token: String?,
                   @JsonProperty("isActive") var isActive: Boolean? = true,
                   var roles: List<Authority>? = listOf(Authority.USER))