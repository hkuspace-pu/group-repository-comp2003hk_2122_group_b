module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    
  ],
  
  plugins : ["transform-remove-strict-mode"],
             
  ignore: [
     "/Public/*.js" ,
     "/src/*.js"
]
}
