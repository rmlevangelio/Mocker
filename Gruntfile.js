// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      build: ['Gruntfile.js', 'src/**/*.js'] // when this task is run, lint the Gruntfile and all js files in src
    },

    //uglify
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'src/js/scripts.min.js': 'src/**/*.js'
        }
      },
      prod: {
        files: {
          'build/js/scripts.min.js': 'src/**/*.js'
        }
      }
    },

    //sass
    sass: {
      build: {
        option: {
          style: 'compressed',
          loadPath: [
            require('grunt-finder-SASS').includePaths
          ]
        },
        files: {
          'src/css/style.css': 'src/sass/style.scss'
        }
      },
      prod: {
        files: {
          'build/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    //copy
    copy: {
      build: {
        cwd: 'src',
        src: [
          '**/*.html', 
          '**/*.php'
        ],
        dest: 'build',
        expand: true
      },
    },

    //clean
    clean: {
      build: {
        src: ['build']
      },
    },

    //cssmin
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/css/style.min.css': 'src/css/style.css'
        }
      }
    },

    //watch 
    watch: { 
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass:build']
      },
      scripts: {
        files: 'src/**/*.js',
        tasks: ['uglify']
      }

    },


    //browserSync
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'src/*.php',
            'src/*.html',
            'src/css/*.css'
          ]
        },
        options: {
          watchTask: true,
          server: './src'
        }
      },
    },
    

  });
  
  //Register Tasks
  grunt.registerTask('default', ['browserSync', 'watch']); 
  grunt.registerTask('build', ['clean', 'copy', 'sass:prod', 'uglify:prod', 'cssmin']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

};
