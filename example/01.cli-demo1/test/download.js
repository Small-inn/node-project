const download = require('download-git-repo')

download('direct:git....', './xxxx ', err => {
  console.log(err)
})