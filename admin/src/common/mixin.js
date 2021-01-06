




export const mixinUpload = {
  data(){
    return {
      uploadUrl: (process.env.VUE_APP_API_URL  || "/admin/api") + '/upload',
    }
  },
  methods: {
    getAuthHeader(){
      const token = sessionStorage.getItem('token') || '';
      return {
        Authorization: `Basic ${token}`
      }
    }
  }
}