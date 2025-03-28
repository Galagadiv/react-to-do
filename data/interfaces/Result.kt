package ua.edu.lntu.quiz.data.interfaces

sealed interface Result<out T, out E> {
    data class Success<T>(val data: T) : Result<T, Nothing>
    data class Error<E>(val error: E) : Result<Nothing, E>

    val isSuccess: Boolean
        get() = this is Success<*>
}
