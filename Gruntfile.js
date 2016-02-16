module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Concatenate all vendor scripts to vendor.js and app scripts to app.js 
        concat: {
            options: {},
            vendor: {
                src: [
              'bower_components/jquery/dist/jquery.min.js',
              'bower_components/bootstrap/dist/js/bootstrap.min.js',
              'bower_components/bootstrap-sidebar/dist/js/sidebar.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js',
              'bower_components/ngCordova/dist/ng-cordova.js'
             ],
                dest: 'build/vendor.js'
            },
            app: {
                src: ['src/**/*.js','!src/scripts/app.js'],
                dest: 'build/custom.js'
            }
        },
        // Minify and add a banner comment to app js file:
        uglify: {
            options: {
                mangle: false, // Breaks angular if true (default) 
                banner: '/** <%= pkg.name %> v<%= pkg.version %> build <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.app.dest %>',
                dest: 'build/custom.min.js'
            }
        },
        // Check all js files with jshint:
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options to override JSHint defaults
                globals: {
                    angular: true,
                    module: true,
                    document: true
                }
            }
        },
        // Copy specified files to build folder:
        copy: {
            css: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                'src/**/*.css', 'bower_components/bootstrap-sidebar/dist/css/sidebar.css'],
                    dest: 'build/css/'
        }]
            },
            views: {
                files: [{
                    expand: true,
                    cwd: 'src/scripts',
                    src: ['**/*.html'],
                    dest: 'build/scripts/'
        }]
            },
            fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['bower_components/bootstrap/fonts/*.*'],
                    dest: 'build/fonts/'
        }]
            },
            app: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/scripts/app.js'],
                    dest: 'build/'
        }]
            },
            html: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/*.html'],
                    dest: 'build/'
        }],
                options: {
                    process: function (content, srcpath) {
                        // Remove all html comments
                        content = content.replace(/<!--[\s\S]*?-->\s*\n*/g, "");
                        // Change bootstrap css file path
                        content = content.replace(/..\/bower_components\/bootstrap\/dist\//g, "");content = content.replace(/..\/bower_components\/bootstrap-sidebar\/dist\//g, "");
                        // Remove all script elements
                        content = content.replace(/<script.*script>\s*\n*/g, "");
                        // Add concatenated js files just before closing body tag
                        content = content.replace(/<\/body>/, '<script src="cordova.js"></script>\n' + '<script src="vendor.js"></script>\n' + '<script src="app.js"></script>\n' + '<script src="custom.min.js"></script>\n</body>');
                        return content;
                    }
                }
            }
        }
    });

    // Load the plugins that provide the grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks
    grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'copy']);

};