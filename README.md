### Frontend Setup (Angular)

1. **Install Node.js and npm**
   - Download from [Node.js official website](https://nodejs.org/)
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. **Install Angular CLI**
   ```bash
   npm install -g @angular/cli
   ```

3. **Setup Frontend Project**
   ```bash
   cd ticket-booking-system/frontend
   npm install
   ```

4. **Start Frontend Server**
   ```bash
   ng serve
   ```
   Frontend will be available at `http://localhost:4200`

## Usage Guide

### Starting the System

1. Start your database server
2. Launch backend server (Spring Boot)
3. Start frontend application (Angular)
4. Access the application at `http://localhost:4200`

### Using the Application

#### For Administrators:
1. Log in to the admin panel
2. Monitor ticket availability
3. Release new tickets when needed
4. View transaction history

#### For Customers:
1. Browse available tickets
2. Select desired quantity
3. Complete purchase process
4. View booking confirmation

## Troubleshooting Guide

### Common Issues and Solutions

1. **Backend Won't Start**
   - Verify database is running
   - Check application.properties configuration
   - Ensure port 9090 is available

2. **Frontend Connection Issues**
   - Confirm backend is running
   - Check CORS configuration
   - Verify API endpoint URLs

3. **Database Connection Failed**
   - Verify database credentials
   - Ensure database service is running
   - Check network connectivity

4. **Angular Build Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

## API Documentation

### Backend Endpoints

```
GET /api/tickets - Get available tickets
POST /api/tickets/purchase - Purchase tickets
GET /api/tickets/status - Get system status
```

### Sample API Requests

```bash
# Get available tickets
curl http://localhost:9090/api/tickets

# Purchase tickets
curl -X POST http://localhost:9090/api/tickets/purchase \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

## Security Considerations

- The system implements basic authentication
- API endpoints are protected with JWT
- Database passwords are encrypted
- CORS is configured for frontend access only

## Support

For additional support or bug reports, please contact:
- Email: support@ticketbooking.com
- Issue Tracker: [GitHub Issues](github.com/ticket-booking/issues)

