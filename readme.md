# The Dream of a fully serverless backend

## Pros:
- Lower costs, not running a db or server 24/7 (unless we had super high usage 24/7)
- Auto-scaling with minimal setup. 
- Easy & connected deployment, orchestration of code and infrastructure (w/ Serverless Framework)
- Very little server management requirements
- it's cool

## Cons: 
- Learning curve
- Architecture/project structure for larger-scale API could be tough (maybe? this is the case for anything new though)
- Not built for long-running processes - large scale updates, automations etc. Lambdas have a max timeout
- Potential 'cold start' time for some languages (Cloudfront & node apparently has a 5ms startup time due to the Chrome V8 engine, but Node APIs can have their own challenges - and not all of them are solved by TypeScript.)
- Can be harder to accurately test locally