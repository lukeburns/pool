## pool

For pooling stream data.

### Usage
```
fs.createReadStream('README.md')
.pipe(pool(function (err, data) {
	console.log(data);
}))
```

### Installation
```
npm install through2-pool
```