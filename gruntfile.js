module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'js/script.js':['components/js/*.js'],
        }//files
      }//my_target
    },//uglify
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }//options
      }//dev
    }, //compass
    watch: {
      options: {
        livereload: true,
        nospawn: true
      },
      scripts: {
      files: ['components/js/*.js'],
      tasks: ['uglify']
    },//scripts
      sass: {
        files: ['components/sass/*.scss'],
        tasks: ['compass:dev'],
        style: 'expanded'
      }, //sass
      php: {
        files: ['*.php']
      },//php
    }//watch
  })//initConfig
  grunt.registerTask('default', 'watch');
} //exports
