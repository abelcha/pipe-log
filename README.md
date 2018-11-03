
# Pipelog

Run JS from stdin.
```
$ curl api.com/ressource | plog "resp.data.map(e => e.name)"
```
# Install

```sh
 $ yarn global add pipe-log
 # or
 $ npm install pipe-log --global
```
# Usage

### Basic Usage
```
$ cat package.json | plog data.version
0.0.1
```
### With a function
```
$ cat package.json | plog "data => Object.keys(data.dependencies))"
[
  'cryptr',
  'date-fns'
 ...
```
### Using a custom variable name
```
$ cat package.json | plog "foobar.version"
0.0.1
```

### Using a non-json file
```
$ cat Dockerfile | plog "data.split('\n').find(e => e.includes('COPY'))"
COPY ./newrelic.js /code/newrelic.js
```
### With lodash (preloaded as _)
```
$ cat package.json | plog "_.toPairs(data.dependencies).map(p => p.join('@')).join(' ')"
lodash@^4.17.11 @babel/core"@^7.0.0-beta.52
```
