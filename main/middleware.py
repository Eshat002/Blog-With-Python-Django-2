# custom_middleware.py

 
class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get the client's IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        print("x", x_forwarded_for)
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
            print("ipssss",ip)
        else:
            ip = request.META.get('REMOTE_ADDR')
            print("ipxxx", ip)
        # Set the IP address in the request object
        request.client_ip = ip

        response = self.get_response(request)
        return response
