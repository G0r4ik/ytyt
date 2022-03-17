module.exports = function (grunt) {
  const sass = require('node-sass');
  require('load-grunt-tasks')(grunt);
  const optipng = require('imagemin-optipng');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/fonts', src: '**', dest: 'dist/fonts' },
          { expand: true, cwd: 'src/video', src: '**', dest: 'dist/video' },
        ],
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: { 'dist/index.html': 'src/index.html' },
      },
    },

    less: {
      development: {
        files: {
          'dist/css/style.css': 'src/less/main.less',
        },
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
      },
      your_target: {
        files: {
          'dist/css/style.css': 'dist/css/style.css',
        },
      },
    },

    cssmin: {
      options: {
        report: 'gzip',
      },

      target: {
        files: {
          'dist/css/style.css': 'dist/css/style.css',
        },
      },
    },

    stylelint: {
      all: ['src/**/*.css', 'src/**/*.less', '!src/**/vendors/*.css'],
      options: {
        configFile: '.stylelintrc.json',
      },
    },

    babel: {
      options: {
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'dist/js',
          },
        ],
      },
    },

    uglify: {
      options: {
        report: 'gzip',
      },
      my_target: {
        files: [
          {
            expand: true,
            cwd: 'dist/js',
            src: '**/*.js',
            dest: 'dist/js',
          },
        ],
      },
    },

    imagemin: {
      options: {
        use: [optipng({ optimizationLevel: 2 })],
      },
      dynamic: {
        files: [
          {
            expand: true,
            cwd: 'src/img/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/img/',
          },
        ],
      },
    },

    concurrent: {
      task1: ['copy', 'htmlmin'],
    },

    watch: {
      options: { livereload: true },
      scripts: {
        options: { spawn: false },
        files: ['src/**/*.js'],
        tasks: ['babel', 'uglify'],
      },
      html: {
        options: { spawn: false },
        files: ['src/**/*.html'],
        tasks: ['htmlmin'],
      },
      css: {
        options: { spawn: false },
        files: ['**/*.less'],
        tasks: ['less'],
      },

      img: {
        options: { spawn: false },
        files: ['**/*.{svg,png}'],
        tasks: ['imagemin'],
      },
    },
  });

  // TASKS
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', [
    'clean',
    'concurrent:task1',
    'less',
    'autoprefixer',
    'cssmin',
    'babel',
    'uglify',
    'imagemin',
    'watch',
  ]);
};
