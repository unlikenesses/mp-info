module.exports = function(grunt) {


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'js/dist/vendor.js':['js/src/vendor/jquery-1.11.2.min.js','js/src/vendor/*.js'],
					'js/dist/event.js': 'js/src/event.js',
					'js/dist/content.js': ['js/src/config.js','js/src/mps.js','js/src/policies.js','js/src/content.js']
				}
			}
		},

		sass: {
			dist: {
				files: {
					'css/dist/twfy.css':'scss/style.scss'
				}
			}
		},

		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'css/dist/twfy.min.css': 'css/dist/twfy.css',
					'css/dist/jquery.qtip.min.css': 'css/jquery.qtip.css'
				}
			}
		},

		watch: {
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass','cssmin']
			},
			js: {
				files: ['js/src/*.js'],
				tasks: ['uglify']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['uglify','sass','cssmin']);

};