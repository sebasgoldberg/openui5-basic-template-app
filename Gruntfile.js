"use strict";

module.exports = function(grunt) {

    grunt.initConfig({

        dir: {
            src: "src",
            webapp: "webapp",
            dist: "dist",
            transp: "transp",
        },

        copy:{
            webapp: {
                files:[ {
                    expand: true,
                    cwd: "<%= dir.src %>",
                    src: ["**/*", "!**/*.js", ],
                    dest: "webapp/",
                },
                ]

            },
        },

        babel: {
            options: {
                sourceMap: true
            },
            src: {
                files:[ {
                    expand: true,
                    cwd:  "src/",
                    src: ["**/*.js"],
                    dest: "webapp/",
                }]
            }
        },

        watch: {
            all:{
                files: ["src/**/*"],
                tasks: ["transp",]
            }
        },

        clean: {
            dist: "dist/",
            webapp: "webapp/",
        },

        eslint: {
            src: ["<%= dir.src %>"]
        },

        exec: {
            i18n_conv: "find webapp/i18n/ -type f -exec native2ascii {} {} \\;",
            zip_dist: "cd dist && zip -r ../dist.zip ./",
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-exec");

    // Linting task
    grunt.registerTask("lint", ["eslint"]);

    // Build task
    if (process.platform === "win32")
        grunt.registerTask("transp", ["clean:webapp", "babel", "copy:webapp"])
    else
        grunt.registerTask("transp", ["clean:webapp", "babel", "copy:webapp", "exec:i18n_conv"]);

    // Default task
    grunt.registerTask("default", [
        "transp",
    ]);
};
