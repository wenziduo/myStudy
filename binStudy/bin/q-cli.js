#! /usr/bin/env node

function run(argv) {
  if (argv[0] === "-v" || argv[0] === "--version") {
    console.log("  version is 0.0.1");
  } else if (argv[0] === "-h" || argv[0] === "--help") {
    console.log("  usage:\n");
    console.log("  -v --version [show version]");
  }
}
run(process.argv.slice(2));
