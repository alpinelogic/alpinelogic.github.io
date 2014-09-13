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
        compress: true,
        sourceMap: true,
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
      options: {
        // Report JSHint errors but not fail the task
        force: true,

        // Ignore warnings
        '-W030': true, // `e && e.preventDefault()`

        globals: {
          window: true,
          console: true
        },

        // Enforcing
        'camelcase': true,     // Identifiers must be in camelCase
        'curly'    : true,     // Require {} for every new block or scope
        'eqeqeq'   : true,     // Require triple equals (===) for comparison
        'forin'    : true,     // Require filtering for..in loops with obj.hasOwnProperty()
        'immed'    : true,     // Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
        'indent'   : 2,        // Number of spaces to use for indentation
        'latedef'  : false,    // Require variables/functions to be defined before being used
        'newcap'   : true,     // Require capitalization of all constructor functions e.g. `new F()`
        'noempty'  : true,     // Prohibit use of empty blocks
        'plusplus' : true,     // Prohibit use of `++` & `--`
        'quotmark' : 'single', // Require single quotes
        'undef'    : true,     // Require all non-global variables to be declared (prevents global leaks)
        'unused'   : false,    // Require all defined variables be used
        'strict'   : true,     // Requires all functions run in ES5 Strict Mode
        'maxparams': 3,        // Max number of formal params allowed per function

        // Relaxing
        'debug'    : true     // Allow debugger statements e.g. browser breakpoints.        
      },

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
