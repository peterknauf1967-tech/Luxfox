sudo bash <<'SKRIPT'
set -e
echo "=== 1) Swap (Auslagerungsdatei 2 GB) ==="
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q "^/swapfile" /etc/fstab || echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi
swapon --show; free -m
echo "=== 2) Pruefen, wie Memos laeuft ==="
ss -tlnp | grep -E ":(80|443|5230) " || true
if ! ss -tln | grep -q ":5230 "; then echo "STOPP: Memos nicht auf Port 5230 - Screenshot an Claude"; docker ps 2>/dev/null || true; exit 0; fi
if ss -tlnp | grep -E ":(80|443) " | grep -vq caddy; then echo "STOPP: Port 80/443 belegt - Screenshot an Claude"; exit 0; fi
echo "=== 3) Caddy installieren (HTTPS automatisch) ==="
apt-get update -qq && apt-get install -y -qq apt-transport-https curl gpg
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --yes --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
apt-get update -qq && apt-get install -y -qq caddy
printf "memos.luxfox.net {\n  reverse_proxy localhost:5230\n}\n" > /etc/caddy/Caddyfile
systemctl enable caddy && systemctl restart caddy
sleep 20
curl -sSI https://memos.luxfox.net | head -1 && echo "FERTIG: https laeuft"
SKRIPT
