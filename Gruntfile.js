'use strict';

module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var buildDir = 'build';
    var buildBase, buildEnv;

    // load the contrib module
    require('load-grunt-tasks')(grunt);

   // grunt.registerTask('config', 'config the build', function() {

        grunt.initConfig({
            pkg: pkg,
            jsSrcBase: 'src/js',
            jsBuildBase: buildDir + '/js',
            cssSrcBase: 'src/css',
            cssBuildBase: buildDir + '/css',
            //清理文件
            clean: {
                build: [buildDir + '/js', buildDir + '/css']
            },
            watch: {
              sass: {
                files: ['<%= cssSrcBase %>/**/*.scss'],
                tasks: ['sass:dev']
              }
            },
            //编译sass
            sass: {
                dev: {
                    expand: true,
                    cwd: '<%= cssSrcBase %>',
                    src: '**/*.scss',
                    dest: '<%= cssSrcBase %>',
                    ext: '.css'
                },
                build: {
                    expand: true,
                    cwd: '<%= cssSrcBase %>',
                    src: ['**/*.scss'],
                    dest: '<%= cssSrcBase %><%= grunt.task.current.args[0] %>/',
                    ext: '.css'
                }
            },
            copy: {
                lib: {
                    expand: true,
                    cwd: '<%= jsSrcBase %>',
                    src: ['lib/**/**.js'],
                    dest: '<%= jsBuildBase %>'
                },
                appcss: {
                    expand: true,
                    cwd: '<%= cssSrcBase %>/app',
                    src: ['*.css'],
                    dest: '<%= cssSrcBase %>',
                    ext: '.css'
                },
                html: {
                     expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: buildDir,
                    ext: '.html'
                }
            },
            //压缩
            uglify: {
                options: {
                    mangle: {
                        except: ['require','exports', 'module']
                    }
                },
/*                build: {
                    files: {
                        '<%= jsBuildBase %>/app/index.js': ['<%= jsSrcBase %>/app/index.js'],
                        '<%= jsBuildBase %>/libs/jquery/jquery-1.8.2.min.js': ['<%= jsSrcBase %>/libs/jquery/jquery-1.8.2.min.js'],
                        '<%= jsBuildBase %>/libs/jquery/jquery-1.11.1.min.js': ['<%= jsSrcBase %>/libs/jquery/jquery-1.11.1.min.js']
                    }
                },*/
                app: {
                    files: [{
                        expand:true,
                        cwd:'<%= jsBuildBase %>',//js目录下
                        src: ['**/*.js','!lib/jquery/**.js'],//所有js文件
                        dest: '<%= jsBuildBase %>'//输出到此目录下
                    }]
                }
            },

            cssmin: {
                dev: {
                    expand: true,
                    cwd: '<%= cssSrcBase %>',
                    src: '**/**.css',
                    dest: '<%= cssBuildBase %>',
                },
            },
            transport: {
              options: {
                debug: false,
                alias: pkg.alias,
                paths: ['<%= jsSrcBase %>']
              },
              target: {
                expand: true,
                cwd: '<%= jsSrcBase %>',
                src: ['**/*.js','!lib/**/*.js'],
                dest: '<%= jsBuildBase %>'
              }
            }
        });
   // });

    grunt.registerTask('build_group', ['clean','sass:build','copy','cssmin','transport','uglify']);

    grunt.registerTask('build', [ 'build_group']);
    grunt.registerTask('u', ['clean','uglify']);
    grunt.registerTask('c', [ 'clean','sass:build','copy:appcss']);
    grunt.registerTask('w', [ 'watch']);


};
