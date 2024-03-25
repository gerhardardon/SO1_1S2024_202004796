import redis

try:
    # Conexión a la base de datos
    redis_client = redis.Redis(host="10.83.107.187", port=6379)
    redis_client.set('msg', 'conexión exitosa :)')
    print(redis_client.get('msg'))
except Exception as e:
    print('err- ', e)
