<script setup lang="ts">
import { addComment } from '~~/services'

const comment = ref('')
const name = ref('')
const email = ref('')
const storeData = ref(false)

onMounted(() => {
  name.value = localStorage.getItem('name')!
  email.value = localStorage.getItem('email')!
  storeData.value = localStorage.getItem('storeData') ? true : false
})

const hasError = ref(false)
const showSuccessMsg = ref(false)

const route = useRoute()
const currentSlug = route.params.slug as string

const submitComment = async () => {
  if (storeData.value) {
    localStorage.setItem('name', name.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('storeData', String(storeData.value))
  } else {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('storeData')
  }

  if (name.value.length && email.value.length && comment.value.length) {
    const { mutate, onDone } = await addComment(name.value, email.value, comment.value, currentSlug)
    mutate()
    onDone(() => {
      showSuccessMsg.value = true
      setTimeout(() => (showSuccessMsg.value = false), 3000)
    })
  } else {
    hasError.value = true
    setTimeout(() => (hasError.value = false), 3000)
  }
}
</script>

<template>
  <form @submit.prevent="submitComment">
    <div class="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 class="text-xl mb-0 font-semibold border-b pb-4">Leave a reply</h3>
      <div class="grid grid-cols-1 gap-4 mb-4">
        <textarea
          v-model="comment"
          placeholder="Comment..."
          class="outline-none p-4 w-full rounded-b-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 focus:placeholder:opacity-0"
        ></textarea>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 focus:placeholder:opacity-0"
        />
        <input
          v-model="email"
          type="email"
          placeholder="E-mail"
          class="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 focus:placeholder:opacity-0"
        />
      </div>
      <div class="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label>
            <input type="checkbox" v-model="storeData" />
            <span class="text-gray-500 text-xs ml-2">
              Save my email and name for the next time I comment.
            </span>
          </label>
        </div>
      </div>

      <p v-if="hasError" class="text-xs text-red-500">All Fields Are required</p>

      <div class="mt-8">
        <button
          type="submit"
          class="transition duration-300 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3"
        >
          Submit Comment
        </button>
        <span v-if="showSuccessMsg" class="text-xl float-right font-semibold mt-3 text-green-500">
          Comment Submit For Review
        </span>
      </div>
    </div>
  </form>
</template>
