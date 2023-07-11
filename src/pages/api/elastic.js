const axios = require('axios');

export default async function handler(req, res) {

    let query = {
        "size": 1000,
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "robotAddress": req.body.robotAddress
                        }
                    },
                    {
                        "match": {
                            "userId": req.body.userId
                        }
                    }
                ]
            }
        },
        "sort": {
            "timestamp": "desc"
        }
    }

    let el = await axios.get('http://elasticsearch:9200/logs/_search', {
        data: query
    })

    res.status(200).json(el.data.hits.hits.map(log => log._source))
  }
  