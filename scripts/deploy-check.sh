#!/bin/bash

# Production Deployment Check Script for WebNaster.com
# This script verifies that both frontend and backend are properly deployed

echo "🚀 WebNaster.com Deployment Check"
echo "=================================="

# Configuration
FRONTEND_URL="https://webnaster.com"
BACKEND_URL="https://api.webnaster.com"
HEALTH_ENDPOINT="/api/health"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
check_url() {
    local url=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    if curl -s --fail --max-time 10 "$url" > /dev/null; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

check_json_endpoint() {
    local url=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    response=$(curl -s --fail --max-time 10 "$url" 2>/dev/null)
    if [ $? -eq 0 ] && echo "$response" | jq . > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        echo "   Response: $(echo "$response" | jq -c .)"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "   Error: Unable to reach endpoint or invalid JSON"
        return 1
    fi
}

check_dns() {
    local domain=$1
    echo -n "Checking DNS for $domain... "
    
    if nslookup "$domain" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

check_ssl() {
    local domain=$1
    echo -n "Checking SSL certificate for $domain... "
    
    if echo | openssl s_client -connect "$domain:443" -servername "$domain" 2>/dev/null | openssl x509 -noout -dates > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

# Main checks
echo ""
echo "🔍 DNS Resolution Checks"
echo "========================"
check_dns "webnaster.com"
check_dns "www.webnaster.com"
check_dns "api.webnaster.com"

echo ""
echo "🔒 SSL Certificate Checks"
echo "========================="
check_ssl "webnaster.com"
check_ssl "www.webnaster.com"
check_ssl "api.webnaster.com"

echo ""
echo "🌐 Frontend Checks"
echo "=================="
check_url "$FRONTEND_URL" "Main website"
check_url "$FRONTEND_URL/about" "About page"
check_url "$FRONTEND_URL/contact" "Contact page"

echo ""
echo "🖥️  Backend Checks"
echo "=================="
check_json_endpoint "$BACKEND_URL$HEALTH_ENDPOINT" "API Health endpoint"
check_json_endpoint "$BACKEND_URL/api/status" "API Status endpoint"
check_url "$BACKEND_URL/ping" "Basic ping endpoint"

echo ""
echo "🔗 CORS Check"
echo "============="
echo -n "Checking CORS configuration... "
cors_response=$(curl -s -H "Origin: https://webnaster.com" \
                    -H "Access-Control-Request-Method: POST" \
                    -H "Access-Control-Request-Headers: Content-Type" \
                    -X OPTIONS \
                    "$BACKEND_URL/api/health" \
                    -w "%{http_code}" -o /dev/null)

if [ "$cors_response" = "200" ] || [ "$cors_response" = "204" ]; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FAILED (HTTP $cors_response)${NC}"
fi

echo ""
echo "📊 Performance Check"
echo "==================="
echo -n "Frontend load time... "
frontend_time=$(curl -s -w "%{time_total}" -o /dev/null "$FRONTEND_URL")
if (( $(echo "$frontend_time < 3.0" | bc -l) )); then
    echo -e "${GREEN}✅ Fast (${frontend_time}s)${NC}"
else
    echo -e "${YELLOW}⚠️  Slow (${frontend_time}s)${NC}"
fi

echo -n "Backend response time... "
backend_time=$(curl -s -w "%{time_total}" -o /dev/null "$BACKEND_URL$HEALTH_ENDPOINT")
if (( $(echo "$backend_time < 2.0" | bc -l) )); then
    echo -e "${GREEN}✅ Fast (${backend_time}s)${NC}"
else
    echo -e "${YELLOW}⚠️  Slow (${backend_time}s)${NC}"
fi

echo ""
echo "📋 Summary"
echo "=========="
echo "✅ If all checks passed, your deployment is successful!"
echo "❌ If any checks failed, review the Production Deployment Guide"
echo ""
echo "🔗 URLs:"
echo "   Frontend: $FRONTEND_URL"
echo "   Backend:  $BACKEND_URL"
echo "   Health:   $BACKEND_URL$HEALTH_ENDPOINT"
echo ""
echo "📚 Documentation: ./PRODUCTION_DEPLOYMENT.md"
echo "🔧 Troubleshooting: ./DEPLOYMENT.md" 