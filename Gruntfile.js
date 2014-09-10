// https://npmjs.org/package/grunt-contrib
module.exports = function(grunt) {  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*!\n' + 
        ' * <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. All Rights Reserved. */\n'
    },


    /**
     * IMAGE MIN
     */
    imagemin: {
      options: {},

      dynamic: {
        files: [
          {
            expand: true, // Enable dynamic expansion
            cwd: '__images/', // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
            dest: 'images/' // Destination path prefix
          }
        ]
      }
    },


    /**
     * CONCAT
     *
    concat: {
      options: {},

      scripts: {
        src: [

        ],

        dest: 'js/app.js'
      }
    },*/


    /**
     * Sass (SCSS syntax)
     */
    sass: {
      options: {
        sourcemap: true,
        style: 'compressed'
      },

      dist: {
        files: [{
          expand: true,
          cwd: 'css/scss',
          src: ['*.scss'],
          dest: './css',
          ext: '.css'
        }]
      }
    },


    /** 
     * UGLIFY JS
     */
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        report: 'gzip',
        compress: true
      },

      dist: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },


    /**
     * JSHINT
     */
    jshint: {
      src: ['js/app.js']
    },


    /**
     * Run `grunt watch` to watch files.
     */
    watch: {
      sass: {
        files: ['css/scss/*.scss'],
        tasks: ['sass'],
        options: { spawn: false }
      },

      scripts: {
        files: ['js/**/*.js'],
        tasks: ['uglify', 'jshint'],
        options: { spawn: false }
      }
    },

    connect: {
      dev: {
        options: {
          port: 9000,
          keepalive: true
        }
      }
    }
  });


  /**
   * Load Grunt plugins.
   */
  [
    'grunt-contrib-imagemin',
    // 'grunt-contrib-concat',
    'grunt-contrib-sass',
    'grunt-contrib-uglify', 
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-connect'
  ].forEach(grunt.loadNpmTasks);

  // The default task.
  grunt.registerTask('default', ['watch']);
};
